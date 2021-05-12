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
        this.HelperGetMotions(motionUrl)
        this.HelperGetSensors(sensorUrl)
    },

    methods: {
        // gets all motions
        GetAllMotions() {
            this.HelperGetMotions(motionUrl)
        },
        //gets all sensors
        GetAllSensors() {
            this.HelperGetSensors(sensorUrl)
        },
         //sets motion table to null
         HideMotionTable() {
            this.motions = []
        },
        // method for getting motions based on url
        async HelperGetMotions(url) {
            try {
                const response = await axios.get(url)
                this.motions = await response.data
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        // method for getting sensors based on url
        async HelperGetSensors(url) {
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
                await this.HelperGetSensor(sensorUrl,id)
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
            this.HelperGetSensors(sensorUrl)
        },
        //method for switching sensors off
        async TurnSensorsOff() {
            try {
                for (let index = 0; index < this.sensors.length; index++) {
                    const element = this.sensors[index];
                    if (element.active) {
                        element.active = false
                        const response = await axios.put(sensorUrl + element.sensorId+"?key=4000", element)
                    }
                }
            } catch (ex) {
                alert(ex.message)
            }
            this.HelperGetSensors(sensorUrl)
        },
        //method for switching sensors on
        async TurnSensorsOn() {
            try {
                for (let index = 0; index < this.sensors.length; index++) {
                    const element = this.sensors[index];
                    if (!element.active) {
                        element.active = true
                        const response = await axios.put(sensorUrl + element.sensorId+"?key=4000", element)
                    }
                }
            } catch (ex) {
                alert(ex.message)
            }
            this.HelperGetSensors(sensorUrl)
        },
        //method to get a single sensor
        async HelperGetSensor(url,id) {
            try {
                const reponse = await axios.get(url+id)
                this.getdata = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        //Method for determining name of sensor
        DetermineName(sensid)
        {
            for(let x of this.sensors){
                if (sensid == x.sensorId) {
                    return x.sensorName
                }
            }
            /*
            this.sensors.forEach(element => {
                if (sensid == element.sensorId) {
                    return element.sensorName
                }
            });
            /*
            for (let index = 0; index < this.sensors.length; index++) {
                const element = this.sensors[index];
                if (sensid == element.sensorId) {
                    return element.sensorName
                }
            }
            */
        },

    }

}).mount("#app")