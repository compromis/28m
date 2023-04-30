import mitt from "mitt";

export default defineNuxtPlugin(() => {
  const { emit, on } = mitt();

  return {
    provide: {
      emit,
      on,
    },
  };
});
