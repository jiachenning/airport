package com.wonders.security.service;

import com.wonders.security.entity.Account;

public interface AccountService {
	
	Account addRolesToAccount(long accountId, long... roleIds);

}
