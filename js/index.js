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
        // gets all motions
        getAllMotions() {
            this.helperGetMotions(motionUrl)
        },
        //gets all sensors
        getAllSensors() {
            this.helperGetSensors(sensorUrl)
        },
         //sets motion table to null
         HideMotionTable() {
            this.motions = []
        },
        // method for getting motions based on url
        async helperGetMotions(url) {
            try {
                const response = await axios.get(url)
                this.motions = await response.data
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        // method for getting sensors based on url
        async helperGetSensors(url) {
            try {
                const reponse = await axios.get(url)
                this.sensors = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        // method for switching active on/off 
        async Switchtruefalse(id) {
            try {
                await this.helperGetSensor(sensorUrl,id)
                if (this.getdata.active) {
                    this.getdata.active = false
                    const response = await axios.put(sensorUrl + id+"?key=4000", this.getdata)
                } else {
                    this.getdata.active = true
                    const response = await axios.put(sensorUrl + id+"?key=4000", this.getdata)
                }
            }
            catch (ex) {
                alert(ex.message)
            }
            this.helperGetSensors(sensorUrl)
        },
        //method to get a single sensor
        async helperGetSensor(url,id) {
            try {
                const reponse = await axios.get(url+id)
                this.getdata = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },

    }

}).mount("#app")