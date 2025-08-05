import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GetRowIdParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Interface for our row data structure
interface RowData {
  id: number;
  key_0: number;
  key_1: number;
  key_2: number;
  key_3: number;
  key_4: number;
  key_5: number;
  key_6: number;
  key_7: number;
  key_8: number;
  key_9: number;
  key_10: number;
  key_11: number;
  key_12: number;
  key_13: number;
  key_14: number;
  key_15: number;
  key_16: number;
  key_17: number;
  key_18: number;
  key_19: number;
  key_20: number;
  key_21: number;
  key_22: number;
  key_23: number;
  key_24: number;
  key_25: number;
  key_26: number;
  key_27: number;
  key_28: number;
  key_29: number;
  key_30: number;
  key_31: number;
  key_32: number;
  key_33: number;
  key_34: number;
  key_35: number;
  key_36: number;
  key_37: number;
  key_38: number;
  key_39: number;
  key_40: number;
  key_41: number;
  key_42: number;
  key_43: number;
  key_44: number;
  key_45: number;
  key_46: number;
  key_47: number;
  key_48: number;
  key_49: number;
  key_50: number;
  key_51: number;
  key_52: number;
  key_53: number;
  key_54: number;
  key_55: number;
  key_56: number;
  key_57: number;
  key_58: number;
  key_59: number;
  key_60: number;
  key_61: number;
  key_62: number;
  key_63: number;
  key_64: number;
  key_65: number;
  key_66: number;
  key_67: number;
  key_68: number;
  key_69: number;
  key_70: number;
  key_71: number;
  key_72: number;
  key_73: number;
  key_74: number;
  key_75: number;
  key_76: number;
  key_77: number;
  key_78: number;
  key_79: number;
  key_80: number;
  key_81: number;
  key_82: number;
  key_83: number;
  key_84: number;
  key_85: number;
  key_86: number;
  key_87: number;
  key_88: number;
  key_89: number;
  key_90: number;
  key_91: number;
  key_92: number;
  key_93: number;
  key_94: number;
  key_95: number;
  key_96: number;
  key_97: number;
  key_98: number;
  key_99: number;
  key_100: number;
  key_101: number;
  key_102: number;
  key_103: number;
  key_104: number;
  key_105: number;
  key_106: number;
  key_107: number;
  key_108: number;
  key_109: number;
  key_110: number;
  key_111: number;
  key_112: number;
  key_113: number;
  key_114: number;
  key_115: number;
  key_116: number;
  key_117: number;
  key_118: number;
  key_119: number;
  key_120: number;
  key_121: number;
  key_122: number;
  key_123: number;
  key_124: number;
  key_125: number;
  key_126: number;
  key_127: number;
  key_128: number;
  key_129: number;
  key_130: number;
  key_131: number;
  key_132: number;
  key_133: number;
  key_134: number;
  key_135: number;
  key_136: number;
  key_137: number;
  key_138: number;
  key_139: number;
  key_140: number;
  key_141: number;
  key_142: number;
  key_143: number;
  key_144: number;
  key_145: number;
  key_146: number;
  key_147: number;
  key_148: number;
  key_149: number;
  key_150: number;
  key_151: number;
  key_152: number;
  key_153: number;
  key_154: number;
  key_155: number;
  key_156: number;
  key_157: number;
  key_158: number;
  key_159: number;
  key_160: number;
  key_161: number;
  key_162: number;
  key_163: number;
  key_164: number;
  key_165: number;
  key_166: number;
  key_167: number;
  key_168: number;
  key_169: number;
  key_170: number;
  key_171: number;
  key_172: number;
  key_173: number;
  key_174: number;
  key_175: number;
  key_176: number;
  key_177: number;
  key_178: number;
  key_179: number;
  key_180: number;
  key_181: number;
  key_182: number;
  key_183: number;
  key_184: number;
  key_185: number;
  key_186: number;
  key_187: number;
  key_188: number;
  key_189: number;
  key_190: number;
  key_191: number;
  key_192: number;
  key_193: number;
  key_194: number;
  key_195: number;
  key_196: number;
  key_197: number;
  key_198: number;
  key_199: number;
}

const DUMMYROW: Omit<RowData, "id"> = {
  key_0: 0.6202035751380308,
  key_1: 0.4163979387747103,
  key_10: 0.7128503790300891,
  key_100: 0.08946195072737151,
  key_101: 0.4342116495759534,
  key_102: 0.7468583318343722,
  key_103: 0.3276010173279078,
  key_104: 0.9565894715720507,
  key_105: 0.9907359306783414,
  key_106: 0.9056079306578635,
  key_107: 0.05477965830358933,
  key_108: 0.9617593436965501,
  key_109: 0.9914001254361169,
  key_11: 0.7720062082254759,
  key_110: 0.9339110725221944,
  key_111: 0.3192310647018819,
  key_112: 0.07508297897055138,
  key_113: 0.6561739321234747,
  key_114: 0.8665863764970256,
  key_115: 0.6589504268838311,
  key_116: 0.9450951240025409,
  key_117: 0.9391921354398489,
  key_118: 0.8637769058102482,
  key_119: 0.9666132751108292,
  key_12: 0.710162493433717,
  key_120: 0.5644226941178119,
  key_121: 0.29574169810893536,
  key_122: 0.9902677714306276,
  key_123: 0.8189470058156585,
  key_124: 0.3407464600742025,
  key_125: 0.16765280648293568,
  key_126: 0.820419870243001,
  key_127: 0.8780665510071688,
  key_128: 0.7251076569909756,
  key_129: 0.9005687181964288,
  key_13: 0.5490332827363211,
  key_130: 0.6875141780688971,
  key_131: 0.7181901788865346,
  key_132: 0.9076282901259134,
  key_133: 0.23065285596592244,
  key_134: 0.41085561853105723,
  key_135: 0.751272627360859,
  key_136: 0.43907223320627087,
  key_137: 0.02558657094938588,
  key_138: 0.9989487572183771,
  key_139: 0.9813190707937653,
  key_14: 0.9795212463973217,
  key_140: 0.9035374986753528,
  key_141: 0.6652743472784881,
  key_142: 0.7597946596807865,
  key_143: 0.26355316290301145,
  key_144: 0.9357929743887288,
  key_145: 0.7854121206192561,
  key_146: 0.7523996709454981,
  key_147: 0.7308297988968957,
  key_148: 0.024306117415532347,
  key_149: 0.4147618818147878,
  key_15: 0.508437747318258,
  key_150: 0.7116366448915339,
  key_151: 0.05588994282635129,
  key_152: 0.5997758069600563,
  key_153: 0.5944778993359294,
  key_154: 0.18266596617183195,
  key_155: 0.9397735923882755,
  key_156: 0.19418715679854937,
  key_157: 0.8159840189747165,
  key_158: 0.7787571130588387,
  key_159: 0.9574277264200948,
  key_16: 0.4924559625664684,
  key_160: 0.6534943082627203,
  key_161: 0.8134004484922379,
  key_162: 0.3764040578032246,
  key_163: 0.9049369505640759,
  key_164: 0.2650860269370183,
  key_165: 0.9998044201750227,
  key_166: 0.5525669089308525,
  key_167: 0.07988958384832379,
  key_168: 0.8792991005453874,
  key_169: 0.5263919176868392,
  key_17: 0.08523916169932155,
  key_170: 0.4751010082985365,
  key_171: 0.7293523875251819,
  key_172: 0.4694550909202517,
  key_173: 0.9908348616442653,
  key_174: 0.9970222090886764,
  key_175: 0.7252547420535544,
  key_176: 0.5051153636769457,
  key_177: 0.12596334184178626,
  key_178: 0.2226856464724436,
  key_179: 0.37060836324044355,
  key_18: 0.5987168487737893,
  key_180: 0.8188657417208645,
  key_181: 0.6595775073424919,
  key_182: 0.5060828891394369,
  key_183: 0.3098500250034133,
  key_184: 0.45127293344200736,
  key_185: 0.297455363417364,
  key_186: 0.5771033373266832,
  key_187: 0.259182407409152,
  key_188: 0.9697125152955608,
  key_189: 0.7436436434397848,
  key_19: 0.14405306077848246,
  key_190: 0.8310807434062069,
  key_191: 0.9824219425771576,
  key_192: 0.6437268762473378,
  key_193: 0.08335400068469268,
  key_194: 0.9543592062787136,
  key_195: 0.5324372543471791,
  key_196: 0.1487136306514767,
  key_197: 0.5271370600347969,
  key_198: 0.7946568036252044,
  key_199: 0.5942660373350734,
  key_2: 0.5566909885375373,
  key_20: 0.7253414411289638,
  key_21: 0.25149629878628166,
  key_22: 0.20645186914690927,
  key_23: 0.2660514342783249,
  key_24: 0.6477947035238154,
  key_25: 0.15286574090061245,
  key_26: 0.5986405740098446,
  key_27: 0.5496264932857768,
  key_28: 0.8256741495201467,
  key_29: 0.5034749354393253,
  key_3: 0.9985859523174323,
  key_30: 0.9005610594610447,
  key_31: 0.5854272785184962,
  key_32: 0.0933223239669998,
  key_33: 0.2614639703287742,
  key_34: 0.6015643845539689,
  key_35: 0.1580251383628284,
  key_36: 0.35667239559360975,
  key_37: 0.1946014477506084,
  key_38: 0.34788146036123946,
  key_39: 0.7963517471255688,
  key_4: 0.09728460469253775,
  key_40: 0.39600777239682516,
  key_41: 0.5873085525326729,
  key_42: 0.7022869889341665,
  key_43: 0.42961815391692326,
  key_44: 0.39942893034269655,
  key_45: 0.44409185370665805,
  key_46: 0.42905550922732916,
  key_47: 0.4104488442930485,
  key_48: 0.08469522810477947,
  key_49: 0.4021248939901385,
  key_5: 0.15424010167911284,
  key_50: 0.3746849506648997,
  key_51: 0.6545682691706232,
  key_52: 0.8428335412047485,
  key_53: 0.41631079965982054,
  key_54: 0.397421699449491,
  key_55: 0.5221919466283473,
  key_56: 0.9297158783640396,
  key_57: 0.6895031757538939,
  key_58: 0.27783216239679787,
  key_59: 0.5506158449390361,
  key_6: 0.7839251715716775,
  key_60: 0.4341665082334192,
  key_61: 0.717268148579385,
  key_62: 0.2870528184708738,
  key_63: 0.09145902541613693,
  key_64: 0.32042735688109314,
  key_65: 0.6942316406620621,
  key_66: 0.7983347400467506,
  key_67: 0.36667908738321064,
  key_68: 0.8478668073885298,
  key_69: 0.5259386312405534,
  key_7: 0.2780580115462419,
  key_70: 0.3017791597802617,
  key_71: 0.8013353379332797,
  key_72: 0.891946839262963,
  key_73: 0.12965095427746798,
  key_74: 0.2300177810329671,
  key_75: 0.9117189583864438,
  key_76: 0.7656995167500595,
  key_77: 0.9936883240020997,
  key_78: 0.9189393303117805,
  key_79: 0.06931519735995972,
  key_8: 0.834039253186815,
  key_80: 0.8969190265583991,
  key_81: 0.894984849377751,
  key_82: 0.35275737699618626,
  key_83: 0.6341700689141807,
  key_84: 0.264501897444801,
  key_85: 0.3698610957978503,
  key_86: 0.987387404712019,
  key_87: 0.9014416060798369,
  key_88: 0.4306390826820532,
  key_89: 0.4275859471176615,
  key_9: 0.02952022344787264,
  key_90: 0.23657706372666265,
  key_91: 0.4671678722341781,
  key_92: 0.2441235135607176,
  key_93: 0.06518499240589581,
  key_94: 0.5667508541511401,
  key_95: 0.641018527386972,
  key_96: 0.5436920812938046,
  key_97: 0.004047296125497812,
  key_98: 0.009186808245524425,
  key_99: 0.15995576029299263,
};

const SimpleMemoryTest: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOpen((curr) => !curr)}>
        {!open ? "Render Grid Component" : "Destroy Grid Component"}
      </button>
      <div>{open && <GridComp />}</div>
    </div>
  );
};

const GridComp: React.FC = () => {
  const generateData = (): RowData[] =>
    [...Array(80000)].map((_, index) => ({ ...DUMMYROW, id: index }));

  const [rowData, setRowData] = useState<RowData[]>(generateData());

  useEffect(() => {
    console.log("rowdata changed");
  }, [rowData]);

  const defaultColDef = useMemo<ColDef<RowData>>(
    () => ({
      flex: 1,
      resizable: true,
      sortable: true,
      filter: true,
      width: 75,
    }),
    []
  );

  const colDefs = useMemo<ColDef<RowData>[]>(
    () => [
      {
        field: "key_0",
      },
      {
        field: "key_1",
      },
      {
        field: "key_2",
      },
      {
        field: "key_3",
      },
      {
        field: "key_4",
      },
      {
        field: "key_50",
      },
      {
        field: "key_14",
      },
      {
        field: "key_20",
      },
    ],
    []
  );

  console.log(rowData);

  return (
    <>
      <button onClick={() => setRowData(generateData())}>
        Populate rowData
      </button>
      <button onClick={() => setRowData([])}>Empty rowData to []</button>
      <div
        className="ag-theme-quartz"
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <AgGridReact<RowData>
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          getRowId={(params: GetRowIdParams<RowData>) =>
            params.data.id.toString()
          }
        />
      </div>
    </>
  );
};

export default SimpleMemoryTest;
