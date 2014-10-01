package it.fadeout.acronetwork.business.config;

import it.fadeout.acronetwork.viewmodels.MapThirdLevelLink;

public class MapThirdLevelLinkConfig {
	boolean isDefault;
	String description;
	String layerIDModifier;
	
	public boolean isDefault() {
		return isDefault;
	}
	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLayerIDModifier() {
		return layerIDModifier;
	}
	public void setLayerIDModifier(String layerIDModifier) {
		this.layerIDModifier = layerIDModifier;
	}
	
	public MapThirdLevelLink getMapThirdLevelLink() {
		MapThirdLevelLink oThird = new MapThirdLevelLink();
		oThird.setDefault(isDefault);
		oThird.setDescription(description);
		oThird.setLayerIDModifier(layerIDModifier);
		
		return oThird;
	}	
}
