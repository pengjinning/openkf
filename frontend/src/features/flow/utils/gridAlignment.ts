/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 14:06:18
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 15:24:52
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { XYPosition } from 'reactflow'

interface GridConfig {
  gridSize: number
  snapThreshold: number
  enabled: boolean
}

export const GRID_SIZE = 20

export const snapToGrid = (position: { x: number; y: number }) => ({
  x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
  y: Math.round(position.y / GRID_SIZE) * GRID_SIZE,
})

export const alignToCenter = (position: { x: number; y: number }) => ({
  x: Math.round((window.innerWidth - 250) / 2),
  y: position.y,
})

export const alignToLeft = (position: { x: number; y: number }) => ({
  x: 100,
  y: position.y,
})

export const alignToRight = (position: { x: number; y: number }) => ({
  x: window.innerWidth - 350,
  y: position.y,
})

export const alignToTop = (position: { x: number; y: number }) => ({
  x: position.x,
  y: 100,
})

export const alignToMiddle = (position: { x: number; y: number }) => ({
  x: position.x,
  y: Math.round(window.innerHeight / 2) - 100,
})

export const alignToBottom = (position: { x: number; y: number }) => ({
  x: position.x,
  y: window.innerHeight - 200,
}) 