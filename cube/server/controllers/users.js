import asyncHandler from 'express-async-handler'

// all user
export const getUsers = asyncHandler(async (req, res, next) => {})

// one user
export const getUserById = asyncHandler(async (req, res, next) => {})

// update user
export const updateUser = asyncHandler(async (req, res, next) => {})

export const deleteUser = asyncHandler(async (req, res, next) => {})

// register
export const register = asyncHandler(async (req, res, next) => {})

// login
export const login = asyncHandler(async (req, res, next) => {})

// logout
export const logoutUser = asyncHandler(async (req, res, next) => {})
