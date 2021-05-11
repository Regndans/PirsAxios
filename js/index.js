const motionUrl = "https://restsense.azurewebsites.net/api/Motion/"
const sensorUrl = "https://restsense.azurewebsites.net/api/sensor/"


Vue.createApp({
    data() {
        return {
            motions:[],
            sensors:[],
        }
    },
    
        async created(){
            console.log("Created method called")
            this.helperGetMotions(motionUrl)
            this.helperGetSensors(sensorUrl)
        },
    
    methods: {
        getAllMotions() {
            this.helperGetMotions(motionUrl)
        },
        getAllSensors() {
            this.helperGetSensors(sensorUrl)
        },
        async helperGetMotions(url) {
            try {
                const response = await axios.get(url)
                this.motions = await response.data
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async helperGetSensors(url) {
            try {
                const reponse = await axios.get(url)
                this.sensors = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        HideMotionTable(){
            this.motions = []
        },
        ShowMotionTable(){
            this.helperGetMotions(motionUrl)
        },
        
    }
     
    }).mount("#app")