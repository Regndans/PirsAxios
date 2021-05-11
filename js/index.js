const motionUrl = "https://restsense.azurewebsites.net/api/Motion/"
const sensorUrl = "https://restsense.azurewebsites.net/api/Sensor/"

Vue.createApp({
    data() {
        return {
            motions: [],
            sensors: [],
            getdata: null 
        }
    },

    async created() {
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
        HideMotionTable() {
            this.motions = []
        },
        ShowMotionTable() {
            this.helperGetMotions(motionUrl)
        },
        async Switchtruefalse(id) {
            try {
                await this.helperGetSensor(sensorUrl,id)
                if (this.getdata.active) {
                    this.getdata.active = false
                    const response = await axios.put(sensorUrl + id+"?key=4000", this.getdata)
                    this.motions = await response.data
                } else {
                    this.getdata.active = true
                    const response = await axios.put(sensorUrl + id+"?key=4000", this.getdata)
                    this.motions = await response.data
                }
            }
            catch (ex) {
                alert(ex.message)
            }
            this.helperGetSensors(sensorUrl)
        },
        async helperGetSensor(url,id) {
            try {
                const reponse = await axios.get(url+id)
                this.getdata = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        }

    }

}).mount("#app")