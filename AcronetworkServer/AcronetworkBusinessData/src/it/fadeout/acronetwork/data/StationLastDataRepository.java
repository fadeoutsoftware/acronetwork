package it.fadeout.acronetwork.data;

import it.fadeout.acronetwork.business.SensorLastData;
import it.fadeout.acronetwork.business.StationLastData;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

public class StationLastDataRepository extends Repository<StationLastData> {
	
	public List<SensorLastData> selectByStationType(String sTableName) {
		
		Session oSession = null;
		List<SensorLastData> aoLastValues = null;
		try {
			oSession = HibernateUtils.getSessionFactory().openSession();
			//oSession.beginTransaction();
			Query oQuery = oSession.createSQLQuery("select * from " + sTableName).addEntity(SensorLastData.class);
			if (oQuery.list().size() > 0)
				aoLastValues =  (List<SensorLastData>) oQuery.list();

		}
		catch(Throwable oEx) {
			System.err.println(oEx.toString());
			oEx.printStackTrace();
		}
		finally {
			if (oSession!=null) {
				oSession.flush();
				oSession.clear();
				oSession.close();
			}

		}
		return aoLastValues;		
	}
	
	
}
