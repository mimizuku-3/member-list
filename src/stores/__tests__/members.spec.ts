import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMembersStore } from '../members'

describe('useMembersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    sessionStorage.clear()
  })

  it('セッションストレージから会員リストを読み込む', () => {
    const store = useMembersStore()
    const members = [
      [1, { id: 1, name: '田中一郎', email: 'tanaka@example.com', points: 100 }],
      [2, { id: 2, name: '鈴木花子', email: 'suzuki@example.com', points: 200 }],
    ] as const
    sessionStorage.setItem('memberList', JSON.stringify(members))

    store.prepareMemberList()

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

    store.insertMember(member)

    expect(store.getById(3)).toEqual(member)
    expect(JSON.parse(sessionStorage.getItem('memberList')!)).toEqual([[3, member]])
  })
})