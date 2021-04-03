export const Search={
    data() {
        return {
            search_fld: '',
        }
    },
    template: `
    <form class="search">
       <label>
          <input type="text" placeholder="Search" class="search_field" v-model="search_fld" v-on:input="searchHandler">
       </label>
       <button type="submit" class="search_btn">Search</button>
    </form>
    `,
    methods: {
        searchHandler() {
            this.$emit('search', this.search_fld)
        }
    }
}