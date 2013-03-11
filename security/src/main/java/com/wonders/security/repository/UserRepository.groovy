package com.wonders.security.repository

import com.wonders.framework.repository.MyRepository
import com.wonders.security.entity.User

interface UserRepository extends MyRepository<User, Long> {

	User findByLoginName(loginName)
}
