const baseUrl = "https://restsense.azurewebsites.net/api/pir/"


Vue.createApp({
    data() {
        return {
            motions: [],
        }
    },
    
        async created(){
            console.log("Created method called")
            this.helperGet(baseUrl)
        },
    
    methods: {
        getAllMotions() {
            this.helperGet(baseUrl)
        },
        async helperGet(url) {
            try {
                const response = await axios.get(url)
                this.motions = await response.data
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        HideTable(){
            this.motions = []
        },
        ShowTable(){
            this.helperGet(baseUrl)
        }
    }
     
    }).mount("#app")