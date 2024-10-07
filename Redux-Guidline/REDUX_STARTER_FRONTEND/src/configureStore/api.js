import { createAction } from "@reduxjs/toolkit";

// we have created a general api action when the api call will begin.
export const apiCallBegan = createAction("api/CallBegan");