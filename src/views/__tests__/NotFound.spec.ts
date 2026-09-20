import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFound from '../NotFound.vue'

describe('NotFound', () => {
  it('404ページを表示する', () => {
    const wrapper = mount(NotFound)

    expect(wrapper.get('h1').text()).toBe('404')
    expect(wrapper.text()).toContain('お探しのページは見つかりませんでした。')
  })
})