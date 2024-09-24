<script>
  import { fade, fly } from "svelte/transition";
  import { elasticOut } from "svelte/easing";
  export let data;
  let hoveredIndex = -1;
</script>

<div class="container mx-auto p-4">
  {#each data as item, index (item)}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="item bg-gray-200 p-2 rounded mb-2"
      on:mouseenter={() => (hoveredIndex = index)}
      on:mouseleave={() => (hoveredIndex = -1)}
      in:fly={{
        y: 50,
        duration: 500,
        delay: index * 100,
        easing: elasticOut,
      }}
      out:fade
    >
      <p class:highlight={hoveredIndex === index}>
        {item}
      </p>
      {#if hoveredIndex === index}
        <div class="popup bg-white p-2 rounded shadow-lg" transition:fade>
          Item {index + 1} of {data.length}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .highlight {
    color: red;
  }
</style>
