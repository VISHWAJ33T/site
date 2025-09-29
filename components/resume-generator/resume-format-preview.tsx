'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ResumeFormat } from '@/types/resume'

interface ResumeFormatPreviewProps {
  format: ResumeFormat
  isSelected: boolean
  onSelect: () => void
}

export function ResumeFormatPreview({ format, isSelected, onSelect }: ResumeFormatPreviewProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-primary ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{format.name}</CardTitle>
          {isSelected && <Badge variant="default">Selected</Badge>}
        </div>
        <CardDescription className="text-sm">{format.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="max-h-32 overflow-hidden rounded-lg bg-muted/50 p-3 font-mono text-xs leading-relaxed">
            <div className="text-muted-foreground">{format.preview}</div>
          </div>
          <div className="flex flex-wrap gap-1">
            {format.features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
