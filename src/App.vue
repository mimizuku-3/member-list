<script setup lang="ts">
import { provide } from 'vue'
import { RouterView } from 'vue-router'
import type { Member} from "@/interfaces";

const memberList = new Map<number, Member>();
memberList.set(1, {id: 1, name: "田中太郎", email: "tanaka@example.com", points: 100, note: "初回入会特典あり"});
memberList.set(2, {id: 2, name: "鈴木花子", email: "suzuki@example.com", points: 200});

provide('memberList', memberList);
</script>


<template>
  <header>
    <h1>Member List</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
main {
	border: blue 1px solid;
	padding: 10px;
}
#breadcrumbs ul li {
	display: inline;
	list-style-type: none;
}
#breadcrumbs {
	margin-left: 0px;
}
#breadcrumbs ul {
	padding-left: 0px;
}
#breadcrumbs ul .current {
	color: red;
}
#breadcrumbs ul li:before {
	content: " > ";
}
#breadcrumbs ul li:first-child:before {
	content: none;
}
</style>
