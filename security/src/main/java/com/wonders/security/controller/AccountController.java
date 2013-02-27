package com.wonders.security.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Account;
import com.wonders.security.repository.AccountRepository;
import com.wonders.security.service.AccountService;

@Controller
@RequestMapping("accounts")
public class AccountController extends AbstractCrudController<Account, Long> {

	@Inject
	private AccountRepository accountRepository;

	@Inject
	private AccountService accountService;

	@Override
	protected MyRepository<Account, Long> getRepository() {
		return accountRepository;
	}

	@RequestMapping(value = "findByUserId", method = RequestMethod.GET)
	protected @ResponseBody
	List<Account> findByUserId(@RequestParam long userId) {
		return accountRepository.findByUserId(userId);
	}

	@RequestMapping("addRolesToAccount")
	protected @ResponseBody
	String addRolesToAccount(@RequestParam long accountId, 
			@RequestParam long... roleIds) {
		
		accountService.addRolesToAccount(accountId, roleIds);
		return "{success: true}";
	}

	@RequestMapping(value = "removeRolesFromAccount")
	protected @ResponseBody
	String removeRolesFromAccount(@RequestParam long accountId,
			@RequestParam long... roleIds) {
		
		accountService.removeRolesFromAccount(accountId, roleIds);
		return "{success: true}";
	}

}
