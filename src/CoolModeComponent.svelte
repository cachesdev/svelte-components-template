<script lang="ts">
  // Button from shadn-svelte
  import CoolMode from "./lib/CoolMode.svelte";
</script>

<div class="relative justify-center">
  <CoolMode options={{ particleCount: 100 }}>
    <button class="btn btn-primary">Colors</button>
  </CoolMode>
</div>
