<script setup lang="ts">
import { inject, reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import type { Member } from "@/interfaces";

const router = useRouter();
const memberList = inject("memberList") as Map<number, Member>;
const member: Member = reactive(
  {
    id: 0,
    name: "",
    email: "",
    points: 0,
    note: ""
  }
);
const onAdd = (): void => {
  console.log(member);
  memberList.set(member.id, member);
  router.push({ name: 'MemberList' });
};
</script>

<template>
  <h1>会員管理</h1>
  <!-- パンくずリスト -->
  <nav id="breadcrumbs">
    <ul>
      <li>
        <RouterLink v-bind:to="{ name: 'AppTop' }">
          TOP
        </RouterLink>
      </li>
      <li>会員リスト</li>
    </ul>
  </nav>

  <section>
    <h2>会員情報追加</h2>
    <p>新しい会員情報を入力してください。</p>
    <form v-on:submit.prevent="onAdd">
      <dl>
        <dt>ID</dt>
        <dd><input type="number" v-model="member.id" required /></dd>
        <dt>名前</dt>
        <dd><input v-model="member.name" required /></dd>
        <dt>メール</dt>
        <dd><input v-model="member.email" required /></dd>
        <dt>ポイント</dt>
        <dd><input type="number" v-model="member.points" required /></dd>
        <dt>備考</dt>
        <dd><textarea v-model="member.note"></textarea></dd>
      </dl>
      <button type="submit">追加</button>
    </form>
  </section>
</template>