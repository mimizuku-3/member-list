import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MemberList from '../MemberList.vue'

describe('MemberList', () => {
  it('各会員と会員追加へのリンクを表示する', () => {
    const memberList = new Map([
      [1, { id: 1, name: '田中太郎', email: 'tanaka@example.com', points: 100 }],
      [2, { id: 2, name: '鈴木花子', email: 'suzuki@example.com', points: 200 }],
    ])
    const wrapper = mount(MemberList, {
      global: {
        provide: { memberList },
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    expect(wrapper.get('h1').text()).toBe('会員管理')
    expect(wrapper.text()).toContain('新規登録はこちらです。')
    expect(wrapper.text()).toContain('IDが1 田中太郎さん')
    expect(wrapper.text()).toContain('IDが2 鈴木花子さん')
    expect(wrapper.findAll('li')).toHaveLength(4)
  })
})