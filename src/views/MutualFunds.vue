<template>
  <div class="mutual-funds">

      
  </div>
</template>

<script>
 
export default {
  name: 'Home',
  
  mounted() {
    this.$emit('loadMutualFunds')
  }
  
}
</script>