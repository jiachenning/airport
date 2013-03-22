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
	
	@RequestMapping(value = "findByUserLoginName", method = RequestMethod.GET)
	protected @ResponseBody
	List<Account> findByUserLoginName(@RequestParam String loginName) {
		return accountRepository.findByUserLoginName(loginName);
	}
	
	@RequestMapping(value = "findByGroupId", method = RequestMethod.GET)
	protected @ResponseBody
	List<Account> findByGroupId(@RequestParam long groupId) {
		return accountRepository.findByGroupId(groupId);
	}
	
	@RequestMapping(value = "addAccountAuthority")
	protected @ResponseBody
	String addAccountAuthority(@RequestParam long accountId, 
			@RequestParam(required = false) long... authIds) {
		accountService.addAccountAuthority(accountId, authIds);
		return "{success: true}";
	}
	
	@RequestMapping(value = "findAccountAuthority", method = RequestMethod.GET)
	protected @ResponseBody
	String findAccountAuthority(@RequestParam long accountId){
		return accountService.findAccountAuthority(accountId);
	}
	
	@RequestMapping(value = "findByUserLoginNameNot", method = RequestMethod.GET)
	protected @ResponseBody
	List<Account> findByUserLoginNameNot(@RequestParam String loginName){
		return accountRepository.findByUserLoginNameNot(loginName);
	}
	
	@RequestMapping(value = "validateAccount", method = RequestMethod.GET)
	protected @ResponseBody
	String validateAccount(@RequestParam String name,
			@RequestParam long userId, @RequestParam long groupId){
		List<Account> list = accountRepository.validateAccout(name, groupId, userId);
		if(list.size() == 0 ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}

}
