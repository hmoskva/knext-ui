import { mapState, mapGetters, mapMutations } from "vuex";
import router from "../router";

export default {
  methods: {
    ...mapMutations(["setProcessing"]),
    toRoute(route) {
      return router.push(route);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "profile"]),
    ...mapState({
      processing: state => state.processing
    })
  }
};
