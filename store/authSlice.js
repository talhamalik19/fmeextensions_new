import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      /* const actionPayload ={
        accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWNvbS05Y2Q5YSIsImF1ZCI6ImVjb20tOWNkOWEiLCJhdXRoX3RpbWUiOjE2ODQ4MjU4NTEsInVzZXJfaWQiOiJhY1FNN1FvOEtRZWVXQmplWVpkd09tNzdLMUEyIiwic3ViIjoiYWNRTTdRbzhLUWVlV0JqZVlaZHdPbTc3SzFBMiIsImlhdCI6MTY4NDgyNTg1MSwiZXhwIjoxNjg0ODI5NDUxLCJlbWFpbCI6ImZhaGVlbS5pcWJhbEB1bml0ZWRzb2wubmV0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImZhaGVlbS5pcWJhbEB1bml0ZWRzb2wubmV0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.CrrUZAoaTInxOawYS5RncyAJ5XOHw8xMOUxWwzMJ5BD8DN4gx9FGdwDkWTGmzB8JZvOjMxpYwFNGwDgW4tRpw4RufA8Gz68Vu6AdiRlkgs_Xr4AZVSmSx4qJKvmxIZiEAkvAsx2mxl6hzRrmxd4Rk_cwhoB0MB8yIhHYTH34WCw1bftPH8fLQYRA5XsQYyr-tp286q-q1C1akQsS-o0nhyqg-qmUXeSlMPTf5D71NvNi2Dat3IIqiIViOpLDhZBa7bibSFpTYC2_l8JHqIeH5lTSfJPiaTP3xoFW_wGNO91mo3-Avqung9Kpv3kPqpDdCumENd2zMrFW3p8xvGb1cQ",
        email: "faheem.iqbal@unitedsol.net",
        uid: "acQM7Qo8KQeeWBjeYZdwOm77K1A2"
      }; */
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
