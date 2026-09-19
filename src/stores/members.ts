import { defineStore } from 'pinia';
import type { Member } from "@/interfaces";

interface State {
  memberList: Map<number, Member>;
}

export const useMembersStore = defineStore('members', {
  state: () => {
    return {
      memberList: new Map<number, Member>()
    }
  },
  getters: {
    getById: (state) => {
      return (id: number): Member => {
        return state.memberList.get(id) as Member;
      }
    }
  },
  actions: {
    initList(): void {
      this.memberList.set(1, {id: 1, name: "田中一郎", email: "tanaka@example.com", points: 100, note: "初回入会特典あり"});
      this.memberList.set(2, {id: 2, name: "鈴木花子", email: "suzuki@example.com", points: 200});
    },
    addMember(member: Member): void {
      this.memberList.set(member.id, member);
    }
  }
});