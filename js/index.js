const motionUrl = "https://restsense.azurewebsites.net/api/Motion"
const sensorUrl = "https://restsense.azurewebsites.net/api/Sensor/"
const timerUrl = "https://restsense.azurewebsites.net/api/Timer/"

Vue.createApp({
    data() {
        return {
            motions: [],
            sensors: [],
            timers: [],
            getdata: null,
            timerStart: null,
            timerEnd: null,
            timerEndReal: null,
            putData: null,
            motionName: null,
            sensName: 'All',
            motionDate: '',
            motionMonth: '', 
            motionYear: '',
        }
    },



    async created() {
        console.log("Created method called")
        this.HelperGetMotions(motionUrl)
        this.HelperGetSensors(sensorUrl)
        this.HelperGetTimer(timerUrl)

    },

    methods: {
        //#region Get Methods
        // gets all motions
        GetAllMotions() {
            this.HelperGetMotions(motionUrl) 
        },
        //gets all motions with date filtering
        GetAllMotionsByDate() {
            this.HelperGetMotions(motionUrl + "?date=" + this.motionDate + 
                                    "&month=" + this.motionMonth + "&year=" + this.motionYear)
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
        GetMotionsBySensorId(id) {
            this.HelperGetMotions(motionUrl + "?sensorId=" + id)
        },
        GetInputFromMotionnames() {
            this.DetermineId(this.sensName)
            if (this.sensName == "All") {this.GetAllMotions()}
            else {
            this.HelperGetMotions(motionUrl + "?sensorId=" + this.motionName)
        }},
        // method for getting sensors based on url
        async HelperGetSensors(url) {
            try {
                const reponse = await axios.get(url)
                this.sensors = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async HelperGetTimer(url) {
            try {
                const reponse = await axios.get(url)
                this.timers = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        //method to get a single sensor
        async HelperGetSensor(url, id) {
            try {
                const reponse = await axios.get(url + id)
                this.getdata = await reponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        //#endregion Get Methods

        //#region SensorSwitching

        // method for switching active on/off 
        async Switchtruefalse(id) {
            try {
                await this.HelperGetSensor(sensorUrl, id)
                if (this.getdata.active) {
                    this.getdata.active = false
                    const response = await axios.put(sensorUrl + id + "?key=4000", this.getdata)
                } else {
                    this.getdata.active = true
                    const response = await axios.put(sensorUrl + id + "?key=4000", this.getdata)
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
                        const response = await axios.put(sensorUrl + element.sensorId + "?key=4000", element)
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
                        const response = await axios.put(sensorUrl + element.sensorId + "?key=4000", element)
                    }
                }
            } catch (ex) {
                alert(ex.message)
            }
            this.HelperGetSensors(sensorUrl)
        },
        //#endregion SensorSwitching
            
        //Method for determining motions sensorId
        DetermineId(sensName) {
            for (let x of this.sensors){
                if (sensName == x.sensorName) {
                    this.motionName = x.sensorId
                    return x.sensorId
                }
            }
        },
        //Method for determining name of sensor
        DetermineName(sensid) {
            for (let x of this.sensors) {
                if (sensid == x.sensorId) {
                    return x.sensorName
                }
            }
        },
        //Method for updating the timer table
        async PutTimes() {
            try {
                this.timers[0].activeStart = this.timerStart
                this.timers[0].activeEnd = this.timerEndReal
                const response = await axios.put(timerUrl+1,this.timers[0])
                putData = await response.data
            } catch (error) {
                alert(error)
            }
        },
        //Method for changing the name from true/false to on/off
        SensorOnOff(on) {
            if (on) { return "On" }
            else return "Off"
        },
        //Method for formatting time in motions table
        FormatTime(time) {
            date = new Date(time).toLocaleDateString("en-DK");
            time = new Date(time).toLocaleTimeString("en-DK").replace(".", ":").substr(0, 5)
            return date + " at " + time
        },
    }

}).mount("#app")