import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTop from '../AppTop.vue'

describe('AppTop', () => {
  it('TOP画面と会員一覧へのリンクを表示する', () => {
    const wrapper = mount(AppTop, {
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    })

    expect(wrapper.get('h1').text()).toBe('TOP')
    expect(wrapper.text()).toContain('会員管理はこちら')
    expect(wrapper.get('a').text()).toBe('会員管理はこちら')
  })
})