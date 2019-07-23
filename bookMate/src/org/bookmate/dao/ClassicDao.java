package org.bookmate.dao;

import java.util.List;

import org.bookmate.entities.Classic;

public interface ClassicDao {
	public final static String CLASSIC_NAMESPACE = "org.bookmate.mapper.ClassicMapper.xml.";
	
	//根据id获取期刊
	public Classic selectById(Integer id);
	
	//根据index获取期刊
	public Classic selectByIndex(Integer index);
		
	//获取最新期刊
	public Classic getClassicLatest();
	
	//获取当前期刊的下一期
	public Classic getNextClassic(Integer index);
	
	//获取当前期刊的前一期
	public Classic getPreviousClassic(Integer index);
	
	//获取我喜欢的期刊
	public List<Classic> getLoveClassics();
	
	//获取点赞信息
	public Classic getFavor(Integer id);
	
	//点赞
	public void setFavor(Classic classic);
	
}
