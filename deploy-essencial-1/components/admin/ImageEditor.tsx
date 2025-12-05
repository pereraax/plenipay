'use client'

import { useState, useRef, useEffect } from 'react'
import { X, RotateCw, ZoomIn, ZoomOut, Move, Check } from 'lucide-react'

interface ImageEditorProps {
  imageFile: File
  aspectRatio?: number // 16/9 para banners
  onSave: (croppedImageBlob: Blob) => void
  onCancel: () => void
}

export default function ImageEditor({ imageFile, aspectRatio = 16/9, onSave, onCancel }: ImageEditorProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, scale: 1 })
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
    }
    reader.readAsDataURL(imageFile)
  }, [imageFile])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && !isResizing) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        })
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const direction = deltaX + deltaY > 0 ? 1 : -1
        const scaleChange = (distance / 200) * direction
        const newScale = Math.max(0.1, Math.min(5, resizeStart.scale + scaleChange))
        setScale(newScale)
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleGlobalMouseMove)
      window.addEventListener('mouseup', handleGlobalMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove)
        window.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart])

  const handleImageLoad = () => {
    // Ajustar escala inicial para caber na área
    if (imageRef.current && containerRef.current) {
      const img = imageRef.current
      const container = containerRef.current
      
      // Calcular escala para preencher o container mantendo aspect ratio
      const scaleX = container.clientWidth / img.width
      const scaleY = container.clientHeight / img.height
      const initialScale = Math.max(scaleX, scaleY) * 1.1 // 10% maior para garantir cobertura
      
      setScale(initialScale)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }


  const handleResizeStart = (e: React.MouseEvent) => {
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      scale: scale
    })
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(prev => Math.max(0.1, Math.min(5, prev * delta)))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleCropAndSave = () => {
    if (!canvasRef.current || !imageRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imageRef.current
    const container = containerRef.current

    // Definir tamanho do canvas (1920x1080 para banners)
    const outputWidth = 1920
    const outputHeight = 1080
    canvas.width = outputWidth
    canvas.height = outputHeight

    // Limpar canvas com fundo preto
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, outputWidth, outputHeight)

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Calcular a área visível da imagem no container
    // A imagem está transformada com scale e position
    const scaledImgWidth = img.naturalWidth * scale
    const scaledImgHeight = img.naturalHeight * scale

    // Posição do topo-esquerdo da imagem escalada no container
    const imgLeft = (containerWidth / 2) - (scaledImgWidth / 2) + position.x
    const imgTop = (containerHeight / 2) - (scaledImgHeight / 2) + position.y

    // Calcular qual parte da imagem original está visível
    const visibleLeft = Math.max(0, -imgLeft / scale)
    const visibleTop = Math.max(0, -imgTop / scale)
    const visibleRight = Math.min(img.naturalWidth, (containerWidth - imgLeft) / scale)
    const visibleBottom = Math.min(img.naturalHeight, (containerHeight - imgTop) / scale)

    const sourceX = visibleLeft
    const sourceY = visibleTop
    const sourceWidth = visibleRight - visibleLeft
    const sourceHeight = visibleBottom - visibleTop

    // Aplicar rotação se necessário
    if (rotation !== 0) {
      ctx.save()
      ctx.translate(outputWidth / 2, outputHeight / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(-outputWidth / 2, -outputHeight / 2)
    }

    // Desenhar a parte visível da imagem, redimensionada para o canvas de saída
    if (sourceWidth > 0 && sourceHeight > 0) {
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        outputWidth,
        outputHeight
      )
    }

    if (rotation !== 0) {
      ctx.restore()
    }

    // Converter para blob
    canvas.toBlob((blob) => {
      if (blob) {
        onSave(blob)
      }
    }, 'image/jpeg', 0.95)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 glass-backdrop">
      <div className="bg-brand-royal rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl border border-white/20 max-w-4xl w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-2xl font-display font-bold text-brand-clean">
            Editar Imagem do Banner
          </h2>
          <button
            onClick={onCancel}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-smooth"
          >
            <X size={20} className="sm:w-6 sm:h-6 text-brand-clean" />
          </button>
        </div>

        {/* Área de edição */}
        <div className="flex-1 flex flex-col gap-2 sm:gap-4 min-h-0">
          {/* Container da imagem */}
          <div
            ref={containerRef}
            className="flex-1 bg-brand-midnight rounded-lg sm:rounded-xl overflow-hidden relative border-2 border-brand-aqua/30 min-h-[200px] sm:min-h-[300px]"
            style={{ aspectRatio: aspectRatio }}
            onWheel={handleWheel}
          >
            {imageSrc && (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={handleMouseDown}
                >
                  <img
                    ref={imageRef}
                    src={imageSrc}
                    alt="Preview"
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
                      maxWidth: 'none',
                      height: 'auto',
                      transition: isDragging || isResizing ? 'none' : 'transform 0.1s',
                      pointerEvents: 'none'
                    }}
                    onLoad={handleImageLoad}
                    draggable={false}
                  />
                </div>
                
                {/* Handle de redimensionamento - canto inferior direito da imagem */}
                {imageRef.current && containerRef.current && (
                  <div
                    className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-brand-aqua border-2 border-brand-midnight rounded-full cursor-nwse-resize flex items-center justify-center shadow-lg z-10"
                    style={{
                      left: `${50 + (position.x / containerRef.current.clientWidth) * 100 + ((imageRef.current.naturalWidth * scale) / containerRef.current.clientWidth) * 50}%`,
                      top: `${50 + (position.y / containerRef.current.clientHeight) * 100 + ((imageRef.current.naturalHeight * scale) / containerRef.current.clientHeight) * 50}%`,
                      transform: `translate(-50%, -50%) rotate(${rotation}deg)`
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      setIsDragging(false)
                      handleResizeStart(e)
                    }}
                  >
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-brand-midnight rounded-full"></div>
                  </div>
                )}
              </>
            )}
            
            {/* Overlay de guias */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-dashed border-brand-aqua/50"></div>
            </div>
          </div>

          {/* Controles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 p-2 sm:p-4 bg-brand-midnight/50 rounded-lg sm:rounded-xl">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs sm:text-sm text-brand-clean/70 hidden sm:inline">Controles:</span>
              
              <button
                onClick={handleRotate}
                className="p-1.5 sm:p-2 bg-brand-midnight hover:bg-white/10 rounded-lg transition-smooth text-brand-clean"
                title="Rotacionar 90°"
              >
                <RotateCw size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => setScale(prev => Math.min(5, prev * 1.1))}
                className="p-1.5 sm:p-2 bg-brand-midnight hover:bg-white/10 rounded-lg transition-smooth text-brand-clean"
                title="Aumentar zoom"
              >
                <ZoomIn size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => setScale(prev => Math.max(0.1, prev * 0.9))}
                className="p-1.5 sm:p-2 bg-brand-midnight hover:bg-white/10 rounded-lg transition-smooth text-brand-clean"
                title="Diminuir zoom"
              >
                <ZoomOut size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => {
                  setPosition({ x: 0, y: 0 })
                  setScale(1)
                  setRotation(0)
                }}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-brand-midnight hover:bg-white/10 rounded-lg transition-smooth text-brand-clean text-xs sm:text-sm"
                title="Resetar"
              >
                Resetar
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-midnight text-brand-clean rounded-lg font-medium hover:bg-white/10 transition-smooth text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={handleCropAndSave}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-aqua text-brand-midnight rounded-lg font-semibold hover:bg-brand-aqua/90 transition-smooth flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                <Check size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Aplicar e Continuar</span>
                <span className="sm:hidden">Aplicar</span>
              </button>
            </div>
          </div>

          {/* Instruções */}
          <div className="text-xs text-brand-clean/60 space-y-0.5 sm:space-y-1 px-1">
            <p className="hidden sm:block">• <strong>Arraste</strong> a imagem para reposicionar</p>
            <p className="hidden sm:block">• <strong>Arraste o círculo</strong> no canto para redimensionar</p>
            <p className="hidden sm:block">• Use a <strong>roda do mouse</strong> ou os botões para fazer zoom</p>
            <p className="hidden sm:block">• Clique em <strong>Rotacionar</strong> para girar a imagem</p>
            <p className="text-[10px] sm:text-xs">• A área destacada (16:9) será o banner final (1920x1080px)</p>
          </div>
        </div>

        {/* Canvas oculto para processamento */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}

