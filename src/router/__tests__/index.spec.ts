import { describe, expect, it } from 'vitest'
import router from '../index'

describe('router', () => {
  it('会員管理に必要なルートをすべて定義する', () => {
    const routes = router.getRoutes()

    expect(routes.map((route) => route.name)).toEqual(expect.arrayContaining([
      'AppTop',
      'MemberList',
      'MemberDetail',
      'MemberAdd',
    ]))
    expect(routes).toHaveLength(4)
    expect(router.resolve({ name: 'MemberList' }).fullPath).toBe('/member/memberList')
    expect(router.resolve({ name: 'MemberDetail', params: { id: 2 } }).fullPath).toBe('/member/detail/2')
    expect(router.resolve({ name: 'MemberAdd' }).fullPath).toBe('/member/add')
  })
})