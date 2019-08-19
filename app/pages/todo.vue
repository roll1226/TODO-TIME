<template>
  <div class="list-wrap-main">
    <List />
    <Add />
    <AddBtn />
  </div>
</template>

<script>
import List from '@/components/List/list'
import AddBtn from '@/components/List/AddBtn'
import Add from '@/components/List/Add'
export default {
  components: {
    List,
    AddBtn,
    Add
  }
}
</script>
