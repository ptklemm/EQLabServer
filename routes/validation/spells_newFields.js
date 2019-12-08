module.exports = [
  {
      field: "id",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "name",
      type: "varchar(64)",
      allowNull: true,
      default: null
  },
  {
      field: "player_1",
      type: "varchar(64)",
      allowNull: true,
      default: "BLUE_TRAIL"
  },
  {
      field: "teleport_zone",
      type: "varchar(64)",
      allowNull: true,
      default: null
  },
  {
      field: "you_cast",
      type: "varchar(120)",
      allowNull: true,
      default: null
  },
  {
      field: "other_casts",
      type: "varchar(120)",
      allowNull: true,
      default: null
  },
  {
      field: "cast_on_you",
      type: "varchar(120)",
      allowNull: true,
      default: null
  },
  {
      field: "cast_on_other",
      type: "varchar(120)",
      allowNull: true,
      default: null
  },
  {
      field: "spell_fades",
      type: "varchar(120)",
      allowNull: true,
      default: null
  },
  {
      field: "range",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "aoerange",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "pushback",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "pushup",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "cast_time",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "recovery_time",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "recast_time",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "buffdurationformula",
      type: "int(11)",
      allowNull: false,
      default: "7"
  },
  {
      field: "buffduration",
      type: "int(11)",
      allowNull: false,
      default: "65"
  },
  {
      field: "AEDuration",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "mana",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value1",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "effect_base_value2",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value3",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value4",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value5",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value6",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value7",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value8",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value9",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value10",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value11",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_base_value12",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value1",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value2",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value3",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value4",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value5",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value6",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value7",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value8",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value9",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value10",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value11",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effect_limit_value12",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max1",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max2",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max3",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max4",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max5",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max6",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max7",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max8",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max9",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max10",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max11",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "max12",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "icon",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "memicon",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "components1",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "components2",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "components3",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "components4",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "component_counts1",
      type: "int(11)",
      allowNull: false,
      default: "1"
  },
  {
      field: "component_counts2",
      type: "int(11)",
      allowNull: false,
      default: "1"
  },
  {
      field: "component_counts3",
      type: "int(11)",
      allowNull: false,
      default: "1"
  },
  {
      field: "component_counts4",
      type: "int(11)",
      allowNull: false,
      default: "1"
  },
  {
      field: "NoexpendReagent1",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "NoexpendReagent2",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "NoexpendReagent3",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "NoexpendReagent4",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "formula1",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula2",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula3",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula4",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula5",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula6",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula7",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula8",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula9",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula10",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula11",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "formula12",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "LightType",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "goodEffect",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "Activated",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "resisttype",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "effectid1",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid2",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid3",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid4",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid5",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid6",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid7",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid8",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid9",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid10",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid11",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "effectid12",
      type: "int(11)",
      allowNull: false,
      default: "254"
  },
  {
      field: "targettype",
      type: "int(11)",
      allowNull: false,
      default: "2"
  },
  {
      field: "basediff",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "skill",
      type: "int(11)",
      allowNull: false,
      default: "98"
  },
  {
      field: "zonetype",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "EnvironmentType",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "TimeOfDay",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "classes1",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes2",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes3",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes4",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes5",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes6",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes7",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes8",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes9",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes10",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes11",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes12",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes13",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes14",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes15",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "classes16",
      type: "int(11)",
      allowNull: false,
      default: "255"
  },
  {
      field: "CastingAnim",
      type: "int(11)",
      allowNull: false,
      default: "44"
  },
  {
      field: "TargetAnim",
      type: "int(11)",
      allowNull: false,
      default: "13"
  },
  {
      field: "TravelType",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "SpellAffectIndex",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "disallow_sit",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities0",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities1",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities2",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities3",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities4",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities5",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities6",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities7",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities8",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities9",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities10",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities11",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities12",
      type: "int(12)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities13",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities14",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities15",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deities16",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field142",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "field143",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "new_icon",
      type: "int(11)",
      allowNull: false,
      default: "161"
  },
  {
      field: "spellanim",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "uninterruptable",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "ResistDiff",
      type: "int(11)",
      allowNull: false,
      default: "-150"
  },
  {
      field: "dot_stacking_exempt",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "deleteable",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "RecourseLink",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "no_partial_resist",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field152",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field153",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "short_buff_box",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "descnum",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "typedescnum",
      type: "int(11)",
      allowNull: true,
      default: null
  },
  {
      field: "effectdescnum",
      type: "int(11)",
      allowNull: true,
      default: null
  },
  {
      field: "effectdescnum2",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "npc_no_los",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field160",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "reflectable",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "bonushate",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field163",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "field164",
      type: "int(11)",
      allowNull: false,
      default: "-150"
  },
  {
      field: "ldon_trap",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "EndurCost",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "EndurTimerIndex",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "IsDiscipline",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field169",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field170",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field171",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field172",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "HateAdded",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "EndurUpkeep",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "numhitstype",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "numhits",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "pvpresistbase",
      type: "int(11)",
      allowNull: false,
      default: "-150"
  },
  {
      field: "pvpresistcalc",
      type: "int(11)",
      allowNull: false,
      default: "100"
  },
  {
      field: "pvpresistcap",
      type: "int(11)",
      allowNull: false,
      default: "-150"
  },
  {
      field: "spell_category",
      type: "int(11)",
      allowNull: false,
      default: "-99"
  },
  {
      field: "field181",
      type: "int(11)",
      allowNull: false,
      default: "7"
  },
  {
      field: "field182",
      type: "int(11)",
      allowNull: false,
      default: "65"
  },
  {
      field: "pcnpc_only_flag",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "cast_not_standing",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "can_mgb",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "nodispell",
      type: "int(11)",
      allowNull: false,
      default: "-1"
  },
  {
      field: "npc_category",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "npc_usefulness",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "MinResist",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "MaxResist",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "viral_targets",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "viral_timer",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "nimbuseffect",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "ConeStartAngle",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "ConeStopAngle",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "sneaking",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "not_extendable",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field198",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field199",
      type: "int(11)",
      allowNull: false,
      default: "1"
  },
  {
      field: "suspendable",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "viral_range",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "songcap",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field203",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field204",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "no_block",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field206",
      type: "int(11)",
      allowNull: true,
      default: "-1"
  },
  {
      field: "spellgroup",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "rank",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field209",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field210",
      type: "int(11)",
      allowNull: true,
      default: "1"
  },
  {
      field: "CastRestriction",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "allowrest",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "InCombat",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "OutofCombat",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field215",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field216",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field217",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "aemaxtargets",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "maxtargets",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field220",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field221",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field222",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field223",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "persistdeath",
      type: "int(11)",
      allowNull: true,
      default: "0"
  },
  {
      field: "field225",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field226",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "min_dist",
      type: "float",
      allowNull: false,
      default: "0"
  },
  {
      field: "min_dist_mod",
      type: "float",
      allowNull: false,
      default: "0"
  },
  {
      field: "max_dist",
      type: "float",
      allowNull: false,
      default: "0"
  },
  {
      field: "max_dist_mod",
      type: "float",
      allowNull: false,
      default: "0"
  },
  {
      field: "min_range",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field232",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field233",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field234",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field235",
      type: "int(11)",
      allowNull: false,
      default: "0"
  },
  {
      field: "field236",
      type: "int(11)",
      allowNull: false,
      default: "0"
  }];