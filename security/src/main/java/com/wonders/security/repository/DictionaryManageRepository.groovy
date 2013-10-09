package com.wonders.security.repository

import com.wonders.framework.repository.MyRepository
import com.wonders.security.entity.DictionaryManage
import com.wonders.security.entity.Role;

interface DictionaryManageRepository extends MyRepository<DictionaryManage, Long> {
	
	DictionaryManage findByName(name)
}
