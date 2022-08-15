export const state = () => ({
  auth: null,
  devices: [],
  dId: "",
});

export const mutations = {
  //to call a mutation use commit
  setAuth(state, auth) {
    state.auth = auth;
  },
  setDevices(state, devices) {
    state.devices = devices;
  },
};

export const actions = {
  readToken() {
    let auth = null;
    try {
      auth = JSON.parse(localStorage.getItem("auth"));
    } catch (error) {
      console.log(error);
    }
    //saving auth in state
    this.commit("setAuth", auth);
  },
  getDevices() {
    const axiosHeader = {
      headers: {
        token: this.state.auth.token,
      },
    };
    this.$axios.get("/devices", axiosHeader).then((res) => {
      console.log(res.data.data);
      this.commit("setDevices", res.data.data);
    });
  },
};
