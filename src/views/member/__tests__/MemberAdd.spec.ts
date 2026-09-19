import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MemberAdd from '../MemberAdd.vue'

const { pushMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
}))

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

  return {
    ...actual,
    useRouter: () => ({ push: pushMock }),
  }
})

describe('MemberAdd', () => {
  it('会員登録フォームを表示する', () => {
    const wrapper = mount(MemberAdd, {
      global: {
        provide: {
          memberList: new Map(),
        },
        stubs: {
          RouterLink: true,
        },
      },
    })

    expect(wrapper.text()).toContain('会員情報追加')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('送信後に会員を追加して会員一覧へ遷移する', async () => {
    const memberList = new Map()
    const wrapper = mount(MemberAdd, {
      global: {
        provide: {
          memberList,
        },
        stubs: {
          RouterLink: true,
        },
      },
    })

    await wrapper.find('input[type="number"]').setValue(3)
    await wrapper.findAll('input')[1]!.setValue('山田次郎')
    await wrapper.findAll('input')[2]!.setValue('yamada@example.com')
    await wrapper.findAll('input')[3]!.setValue(300)
    await wrapper.find('textarea').setValue('新規会員')
    await wrapper.find('form').trigger('submit')

    expect(memberList.get(3)).toEqual({
      id: 3,
      name: '山田次郎',
      email: 'yamada@example.com',
      points: 300,
      note: '新規会員',
    })
    expect(pushMock).toHaveBeenCalledWith({ name: 'MemberList' })
  })
})