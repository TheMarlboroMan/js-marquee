function marquee(_w, _h) {
	this.w=_w;
	this.h=_h;
	this.table=document.createElement('table');
}

marquee.prototype={

	create : function(_container) {

		let create_row=function(_t) {
			let r=document.createElement('tr');
			_t.appendChild(r);
			return r;
		};
		let create_cell=function(_r) {
			let c=document.createElement('td');
			c.innerHTML='&nbsp;';
			_r.appendChild(c);
		}

		let y=0;
		while(y < this.h) {
			let x=0;
			let r=create_row(this.table);
			while(x < this.w) {
				let c=create_cell(r);
				++x;
			}
			++y;
		}

		_container.appendChild(this.table);
	},

	get_cell : function(_x, _y) {

		if(_x < 0 || _y < 0 || _x >= this.w || _y >= this.h) {
			throw new Error('Invalid coordinates');
		}

		return this.table.rows[_y].cells[_x];
	},

	apply_to_all : function(_f) {

		let y=0;
		while(y < this.h) {
			let x=0;
			while(x < this.w) {
				_f(this.get_cell(x, y));
					x++;
			}
			y++;
		}
		
//		this.table.rows.forEach((_row) => {
//			_row.cells.forEach((_cell) => {
//				_f(_cell);
//			});
//		});
	},

	apply_to_collection : function(_cells, _f) {

		_cells.forEach( (_pair) => {
			_f(this.get_cell(_pair.x, _pair.y));
		});
	},

	make_pair : function(_x, _y) {
		return {x:_x, y:_y};
	},

	collection_from_string : function(_str) {

		let pieces=_str.split('\n');
		if(pieces.length!=this.h) {
			throw new Error('Bad string size');
		}

		let y=0;
		let result=[];
		pieces.forEach((_item) => {
			if(_item.length!=this.w) {
				throw new Error('Bad string length: at "'+_item+'"');
			}

			let x=0;
			while(x < this.w) {
				if(_item.charAt(x)!=' ') {
					result.push(this.make_pair(x, y));
				}
				++x;
			}
			++y;
		});

		return result;
	}
};

