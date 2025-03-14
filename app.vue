<script setup lang="ts">
import { NuxtPage } from '#components';
import { Modals } from '#components';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

ModuleRegistry.registerModules([AllCommunityModule]);


</script>


<template>
  <div class="font-shatoshi" id="modal-render-entrypoint"></div>
  <Modals />
  <NuxtPage />
</template>
