import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'
import { useMembersStore } from '../stores/members'

describe('App', () => {
  it('初期会員リストをPinia経由で初期化して表示する', () => {
    const routeViewProbe = defineComponent({
      setup() {
        const membersStore = useMembersStore()
        return { membersStore }
      },
      template: '<div>{{ membersStore.memberList.get(1)?.name }}</div>',
    })

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterView: routeViewProbe,
        },
      },
    })

    expect(wrapper.get('header h1').text()).toBe('Piniaサンプル')
    expect(wrapper.get('main').text()).toContain('田中一郎')
  })
})