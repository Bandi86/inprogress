import asyncHandler from "express-async-handler";

const getAllJobs = asyncHandler(async (req, res) => {
  res.send("get all jobs");
});

const getJob = asyncHandler(async (req, res) => {
  res.send("get job");
});

const createJob = asyncHandler(async (req, res) => {
  res.send("create job");
});

const updateJob = asyncHandler(async (req, res) => {
  res.send("update job");
});

const removeJob = asyncHandler(async (req, res) => {
  res.send("remove job");
});

export { getAllJobs, getJob, createJob, updateJob, removeJob };
