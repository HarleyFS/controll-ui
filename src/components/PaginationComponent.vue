<template>
  <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li>
        <a
          class="pagination-previous"
          @click="goToPreviousPage()"
          :disabled="currentPage === 1"
        >
          <i class="fas fa-angle-left"></i>
        </a>
      </li>
      <li v-for="page in visiblePages" :key="page">
        <a
          class="pagination-link"
          :class="{ 'is-current': page === currentPage }"
          @click="goToPage(page)"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          class="pagination-next"
          @click="goToNextPage()"
          :disabled="currentPage === totalPages"
        >
          <i class="fas fa-angle-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "PaginatorComponent",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    totalElements: {
      type: Number,
      required: true,
    },
    onPageChange: {
      type: Function as PropType<(page: number) => void>,
      required: true,
    },
  },

  data() {
    return { visiblePages: [1, 2, 3] };
  },

  methods: {
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.onPageChange(this.currentPage - 1);
      }
      this.updatePagination();
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.onPageChange(this.currentPage + 1);
      }
      this.updatePagination();
    },

    goToPage(page: number) {
      this.onPageChange(page);
    },

    updatePagination() {
      const pages = this.totalElements / 10;
      if (this.currentPage != 1 && this.currentPage < pages) {
        this.visiblePages = [
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
        ];
      }
    },
  },
});
</script>

<style scoped>
.pagination-list {
  justify-content: center;
}

.pagination-link.is-current {
  background: var(--primary);
  border: 0;
  color: var(--light);
}

.pagination-next {
  background: var(--primary);
  border: 0;
  color: var(--light);
  cursor: pointer;
  opacity: 1;
}

.pagination-previous {
  background: var(--primary);
  border: 0;
  color: var(--light);
  cursor: pointer;
  order: 1;
  opacity: 1;
}
</style>
