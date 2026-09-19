import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { useMembersStore } from '@/stores/members'
import MemberDetail from '../MemberDetail.vue'

const createMemberList = () => new Map([
  [1, {
    id: 1,
    name: '田中太郎',
    email: 'tanaka@example.com',
    points: 100,
    note: '初回入会特典あり',
  }],
  [2, {
    id: 2,
    name: '鈴木花子',
    email: 'suzuki@example.com',
    points: 200,
  }],
])

describe('MemberDetail', () => {
  it('選択した会員の情報を表示する', () => {
    const pinia = createPinia()
    const membersStore = useMembersStore(pinia)
    membersStore.memberList = createMemberList()
    const wrapper = mount(MemberDetail, {
      props: { id: 1 },
      global: {
        plugins: [pinia],
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    expect(wrapper.text()).toContain('田中太郎')
    expect(wrapper.text()).toContain('tanaka@example.com')
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('初回入会特典あり')
  })

  it('備考がない会員にはプレースホルダーを表示する', () => {
    const pinia = createPinia()
    const membersStore = useMembersStore(pinia)
    membersStore.memberList = createMemberList()
    const wrapper = mount(MemberDetail, {
      props: { id: 2 },
      global: {
        plugins: [pinia],
        stubs: { RouterLink: true },
      },
    })

    expect(wrapper.text()).toContain('--')
  })
})