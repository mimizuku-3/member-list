import { defineComponent } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'
import { useMembersStore } from '../stores/members'

describe('App', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('セッションストレージが空の場合は会員リストも空である', () => {
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
    expect(wrapper.get('main').text()).toBe('')
  })

  it('アプリ起動時にセッションストレージから会員リストを復元する', () => {
    sessionStorage.setItem('memberList', JSON.stringify([
      [1, { id: 1, name: '田中一郎', email: 'tanaka@example.com', points: 100 }],
    ]))
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
        stubs: { RouterView: routeViewProbe },
      },
    })

    expect(wrapper.get('main').text()).toContain('田中一郎')
  })
})