"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HomeOnlineLogo } from "../components/HomeOnlineLogo"

export default function LogoGenerator() {
  const [color, setColor] = useState("#10B981") // Default emerald color
  const [text, setText] = useState("Home Online")
  const [fontSize, setFontSize] = useState(24)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Home Online Logo Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Logo Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="color">Logo Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="text">Logo Text</Label>
                <Input id="text" type="text" value={text} onChange={(e) => setText(e.target.value)} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <div className="flex gap-2 items-center mt-1">
                  <Input
                    id="fontSize"
                    type="range"
                    min="12"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{fontSize}px</span>
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Download Logo</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-8 p-4">
              <div className="p-6 border rounded-lg bg-white w-full flex justify-center">
                <div style={{ color: color }}>
                  <HomeOnlineLogo className="h-24 w-24" />
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-white w-full flex justify-center">
                <div className="flex items-center" style={{ color: color }}>
                  <HomeOnlineLogo className="h-12 w-12" />
                  <span className="ml-2 font-bold" style={{ fontSize: `${fontSize}px` }}>
                    {text}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
