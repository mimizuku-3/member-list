import { defineComponent, inject } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import type { Member } from '../interfaces'

describe('App', () => {
  it('初期会員リストをルートコンテンツに提供する', () => {
    const routeViewProbe = defineComponent({
      setup() {
        const memberList = inject('memberList') as Map<number, Member>
        return { memberList }
      },
      template: '<div>{{ memberList.get(1)?.name }}</div>',
    })

    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: routeViewProbe,
        },
      },
    })

    expect(wrapper.get('header h1').text()).toBe('Member List')
    expect(wrapper.get('main').text()).toContain('田中太郎')
  })
})