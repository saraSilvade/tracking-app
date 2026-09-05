// src/utils/levelMath.ts
import type { UserProfile } from '../types'

interface Rewards {
  xp?: number
  gold?: number
  gems?: number
  trophies?: number
}

export const addRewards = (user: UserProfile, rewards: Rewards): UserProfile => {
  let exp = user.exp + (rewards.xp || 0)
  let level = user.level
  let expMax = user.expMax

  // Check Level Up
  if (exp >= expMax) {
    exp = exp - expMax
    level += 1
    expMax += 50
  }

  // Determine Title & Icon
  let title = 'Novice'
  let icon = '🗡️'
  if (level >= 10) {
    title = 'Knight'
    icon = '🛡️'
  } else if (level >= 5) {
    title = 'Veteran'
    icon = '⚔️'
  }

  return {
    ...user,
    exp,
    level,
    expMax,
    lvlIcon: icon,
    title,
    gold: (user.gold || 0) + (rewards.gold || 0),
    gems: (user.gems || 0) + (rewards.gems || 0),
    tro: (user.tro || 0) + (rewards.trophies || 0)
  }
}