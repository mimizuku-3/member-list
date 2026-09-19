import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMembersStore } from '../members'

describe('useMembersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初期会員リストを登録する', () => {
    const store = useMembersStore()

    store.initList()

    expect(store.memberList.size).toBe(2)
    expect(store.getById(1)?.name).toBe('田中一郎')
    expect(store.getById(2)?.name).toBe('鈴木花子')
  })

  it('会員を追加してIDから取得できる', () => {
    const store = useMembersStore()
    const member = {
      id: 3,
      name: '山田次郎',
      email: 'yamada@example.com',
      points: 300,
    }

    store.addMember(member)

    expect(store.getById(3)).toEqual(member)
  })
})