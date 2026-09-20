import { defineStore } from 'pinia';
import type { Member } from "@/interfaces";

interface State {
  memberList: Map<number, Member>;
}

export const useMembersStore = defineStore('members', {
  state: (): State => {
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
    prepareMemberList(): void {
       let memberList = new Map<number, Member>();
       const memberListJSONstr = sessionStorage.getItem('memberList');
       if (memberListJSONstr) {
       try {
         const memberListJSON: [number, Member][] = JSON.parse(memberListJSONstr);
         memberList = new Map<number, Member>(memberListJSON);
       } catch {
         sessionStorage.removeItem('memberList');
       }
       this.memberList = memberList;
       }
    },
    insertMember(member: Member): void {
      this.memberList.set(member.id, member);
      const memberListJSONstr = JSON.stringify([...this.memberList]);
      sessionStorage.setItem('memberList', memberListJSONstr);
    }
  },
});
