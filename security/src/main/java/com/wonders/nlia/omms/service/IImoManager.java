package com.wonders.nlia.omms.service;

import java.util.Map;

public interface IImoManager {

	/**
	 * 
	 * @param map
	 * key:
	 * uname	用户中文名,
	 * gender	性别,
	 * passwd	密码,
	 * uaccount	用户登录名
	 * @return 
	 * uid 		imo的userId
	 */
    public String addStaff(Map<String,String>map) ;
    
    /**
     * 
     * @param map
     * key:
     * uid　		imo的userId
     * uname	用户中文名,
	 * gender	性别,
	 * passwd	密码,
     * @return 
     * {"result":"fail"}
     * {"result":"success"}
     */
    public String modifyStaff(Map<String,String>map) ;
        
    /**
	 * 删除用户
	 * @param String　uid
	 * @return 
	 * uid 		imo的userId
	 */
    public String removeStaff(String uid) ;
}
