module.exports = function (sequelize, DataTypes)
{
    return sequelize.define('spell_template',
    {
        id:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            primaryKey: true
        },
        name:
        {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        player_1:
        {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: 'BLUE_TRAIL'
        },
        teleport_zone:
        {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        you_cast:
        {
            type: DataTypes.STRING(120),
            allowNull: true
        },
        other_casts:
        {
            type: DataTypes.STRING(120),
            allowNull: true
        },
        cast_on_you:
        {
            type: DataTypes.STRING(120),
            allowNull: true
        },
        cast_on_other:
        {
            type: DataTypes.STRING(120),
            allowNull: true
        },
        spell_fades:
        {
            type: DataTypes.STRING(120),
            allowNull: true
        },
        range:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        aoerange:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        pushback:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        pushup:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        cast_time:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        recovery_time:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        recast_time:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        buffdurationformula:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '7'
        },
        buffduration:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '65'
        },
        AEDuration:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        mana:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        effect_base_value2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_base_value12:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effect_limit_value12:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        max12:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        icon:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        memicon:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        components1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        components2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        components3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        components4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        component_counts1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        component_counts2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        component_counts3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        component_counts4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        NoexpendReagent1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        NoexpendReagent2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        NoexpendReagent3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        NoexpendReagent4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        formula1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        formula12:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        LightType:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        goodEffect:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        Activated:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        resisttype:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        effectid1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        effectid12:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '254'
        },
        targettype:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '2'
        },
        basediff:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        skill:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '98'
        },
        zonetype:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        EnvironmentType:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        TimeOfDay:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        classes1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes12:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes13:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes14:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes15:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        classes16:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '255'
        },
        CastingAnim:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '44'
        },
        TargetAnim:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '13'
        },
        TravelType:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        SpellAffectIndex:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        disallow_sit:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities0:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities1:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities3:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities4:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities5:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities6:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities7:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities8:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities9:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities10:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities11:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities12:
        {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            defaultValue: '0'
        },
        deities13:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities14:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities15:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deities16:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field142:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        field143:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        new_icon:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '161'
        },
        spellanim:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        uninterruptable:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        ResistDiff:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-150'
        },
        dot_stacking_exempt:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        deleteable:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        RecourseLink:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        no_partial_resist:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field152:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field153:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        short_buff_box:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        descnum:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        typedescnum:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        effectdescnum:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        effectdescnum2:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        npc_no_los:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field160:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        reflectable:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        bonushate:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field163:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        field164:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-150'
        },
        ldon_trap:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        EndurCost:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        EndurTimerIndex:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        IsDiscipline:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field169:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field170:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field171:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field172:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        HateAdded:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        EndurUpkeep:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        numhitstype:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        numhits:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        pvpresistbase:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-150'
        },
        pvpresistcalc:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '100'
        },
        pvpresistcap:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-150'
        },
        spell_category:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-99'
        },
        field181:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '7'
        },
        field182:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '65'
        },
        field183:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field184:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        can_mgb:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        nodispell:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '-1'
        },
        npc_category:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        npc_usefulness:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        MinResist:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        MaxResist:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        viral_targets:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        viral_timer:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        nimbuseffect:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        ConeStartAngle:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        ConeStopAngle:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        sneaking:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        not_extendable:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field198:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field199:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        suspendable:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        viral_range:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        songcap:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field203:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field204:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        no_block:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field206:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '-1'
        },
        spellgroup:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        rank:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field209:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field210:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1'
        },
        CastRestriction:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        allowrest:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        InCombat:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        OutofCombat:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field215:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field216:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field217:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        aemaxtargets:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        maxtargets:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field220:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field221:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field222:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field223:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        persistdeath:
        {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        field225:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field226:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        min_dist:
        {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: '0'
        },
        min_dist_mod:
        {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: '0'
        },
        max_dist:
        {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: '0'
        },
        max_dist_mod:
        {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: '0'
        },
        min_range:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field232:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field233:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field234:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field235:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        field236:
        {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        }
    });
};